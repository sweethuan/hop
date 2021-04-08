check(type, len) {
  if (type === "date" || type === "datetime" || type === "timestamp" || type === "int" || type === "bigint" || type ===
    "smallint" || type === "tinyint" || type === "money" ||
    type === "smallmoney" || type === "real" || type === "varchar(max)" || type === "text" || type ===
    "nvarchar(max)" || type === "ntext" || type === "varbinary(max) " ||
    type === "image" || type === "hierarchyid" || type === "uniqueidentifier" || type === "sql_variant" || type ===
    "xml" || type === "geometry" || type === "geography"
  ) {
    valueLength = 0 //禁用长度
    dataType = type
    dataTypeLen = type
  } else if (type === "datetime2" || type === "datetimeoffset" || type === "time") {
    if (len < 1 || len > 7) {
      // 错误提示
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "nchar" || type === "nvarchar") {
    if (len < 1 || len > 4000) {
      // 错误提示
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "char" || type === "varchar" || type === "binary" || type === "varbinary") {
    if (len < 1 || len > 8000) {
      // 错误提示
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "float") {
    if (len < 1 || len > 53) {
      // 错误提示
    }
    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  } else if (type === "decimal" || type === "numeric") {
    if (len截取总长度 < 1 || len截取总长度 > 38) {
      // 错误提示
    }
    // 整数和小数长度判断
    if (len截取小数长度 < 0 || len截取小数长度 > 10) {
      // 错误提示
    }

    valueLength = len
    dataType = type
    dataTypeLen = type + "(" + len + ")"
  }
}
