class DbSet {
    constructor(db, table_name) {
        this.table_name = table_name;
        this._db = db;
    }
}

module.exports = DbSet;