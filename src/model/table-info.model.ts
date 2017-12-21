export declare class RenderData {
  component: string;
  columns: ColumnsInfo;
}

export declare type ColumnsInfo = ColumnInfo[];

export declare class ColumnInfo {
  column: string;
  comment: string;
  type: string;
  allowNull: boolean;
}
