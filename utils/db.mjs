import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:1122@localhost:5432/CollectionBooks_Backend",
});

export default connectionPool;
