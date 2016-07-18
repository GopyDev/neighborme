package neighborme.db;

import static ox.util.Functions.map;
import java.time.LocalDateTime;
import java.util.List;
import ox.Json;
import ez.Row;
import ez.Table;

public class RequestDB extends NeighborMeDB {

  @Override
  protected Table getTable() {
    return new Table("request")
        .idColumn()
        .column("userId", Long.class)
        .column("creationDate", LocalDateTime.class)
        .column("title", String.class)
        .column("description", "TEXT")
        .column("amount", Integer.class)
        .column("street", String.class)
        .column("apartment", String.class)
        .column("zipcode", String.class)
        .index("userId");
  }

  public List<Json> getAll() {
    List<Row> rows = db.select("SELECT * FROM request");
    return map(rows, Row::toJson);
  }

  public Json get(long requestId) {
    return db.selectSingleRow("SELECT * FROM request WHERE id = ?", requestId).toJson();
  }

  public List<Json> getRequests(long userId) {
    List<Row> rows = db.select("SELECT * FROM request WHERE userId = ?", userId);
    return map(rows, Row::toJson);
  }

  public void insert(long userId, String title, String description, int amount, String street, String apartment,
      String zipcode) {
    db.insert("request", new Row()
        .with("userId", userId)
        .with("creationDate", LocalDateTime.now())
        .with("title", title)
        .with("description", description)
        .with("amount", amount)
        .with("street", street)
        .with("apartment", apartment)
        .with("zipcode", zipcode)
        );
  }

}
