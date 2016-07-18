package neighborme.db;

import ez.DB;
import ez.Table;

public abstract class NeighborMeDB {

  public static final DB db;

  static {
    db = new DB("localhost", "root", "", "neighborme");
  }

  protected final Table table;

  public NeighborMeDB() {
    table = getTable();
    if (!db.hasTable(table.name)) {
      db.addTable(table);
    }
  }

  protected abstract Table getTable();

}
