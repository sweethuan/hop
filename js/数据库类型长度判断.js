check(type, len) {
  if (type === "date" || type === "datetime" || type === "timestamp" || type === "int" || type === "bigint" || type ===
    "smallint" || type === "tinyint" || type === "money" ||
    type === "smallmoney" || type === "real" || type === "varchar(max)" || type === "text" || type ===
    "nvarchar(max)" || type === "ntext" || type === "varbinary(max) " ||
    type === "image" || type === "hierarchyid" || type === "uniqueidentifier" || type === "sql_variant" || type ===
    "xml" || type === "geometry" || type === "geography"
  ) {
    valueLength = 0 //���ó���
    dataType = type
    dataTypeLen = type
  } else if (type === "datetime2" || type === "datetimeoffset" || type === "time") {
    if (len < 1 || len > 7) {
      // ������ʾ
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "nchar" || type === "nvarchar") {
    if (len < 1 || len > 4000) {
      // ������ʾ
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "char" || type === "varchar" || type === "binary" || type === "varbinary") {
    if (len < 1 || len > 8000) {
      // ������ʾ
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "float") {
    if (len < 1 || len > 53) {
      // ������ʾ
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "decimal" || type === "numeric") {
    if (len��ȡ�ܳ��� < 1 || len��ȡ�ܳ��� > 38) {
      // ������ʾ
    }
    // ������С�������ж�
    if (len��ȡС������ < 0 || len��ȡС������ > 10) {
      // ������ʾ
    }

    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  }
}
