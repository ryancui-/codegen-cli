import * as mysql from 'mysql';
import {ColumnsInfo, RenderData} from '../model/table-info.model';

export class MySQLProvider {
  DESCRIBE_SQL = `
    select
      column_name, column_comment, data_type, is_nullable
    from
      information_schema.columns
    where
      table_schema = '$db' and table_name = '$table'
    `;

  dbConfig;
  table;

  constructor(dbConfig, table) {
    this.dbConfig = dbConfig;
    this.table = table;
  }

  getRenderData(): Promise<RenderData> {
    const connection = mysql.createConnection(this.dbConfig);

    return new Promise((resolve, reject) => {
      connection.connect();
      connection.query(
        this.DESCRIBE_SQL.replace('$db', this.dbConfig.database).replace('$table', this.table),
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              component: '',
              columns: this.transformDataType(results)
            });
          }
        });
      connection.end();
    });
  }

  private transformDataType(result): ColumnsInfo {
    return result.map(data => {
      return {
        column: data.column_name,
        comment: data.column_comment,
        type: data.data_type
          .replace(/int|decimal|tinyint/, 'number')
          .replace(/varchar/, 'string')
          .replace(/datetime/, 'date'),
        allowNull: data.is_nullable.toLowerCase() === 'yes'
      };
    });
  }
}
