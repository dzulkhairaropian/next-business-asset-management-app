// prisma.config.js
module.exports = {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "mysql://root:@127.0.0.1:3306/db_business_asset_management_app",
  },
}
