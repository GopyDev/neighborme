package neighborme.db;

import static ox.util.Functions.map;
import java.time.LocalDateTime;
import java.util.List;
import ox.Json;
import com.google.common.base.Joiner;
import ez.Row;
import ez.Table;

public class MessageDB extends NeighborMeDB {

  @Override
  protected Table getTable() {
    return new Table("message")
        .idColumn()
        .column("time", LocalDateTime.class)
        .column("fromId", Long.class)
        .column("toId", Long.class)
        .column("requestId", Long.class)
        .column("text", "TEXT")
        .column("read", Boolean.class)
        .index("fromId")
        .index("toId")
        .index("requestId")
        .index("read");
  }

  public int getNumUnreadMessages(long userId) {
    return db.getCount("SELECT count(*) FROM message WHERE toId = ? AND `read` IS false", userId);
  }

  public void markAsRead(List<Long> ids) {
    if (ids.isEmpty()) {
      return;
    }
    
    db.update("UPDATE message SET `read` = TRUE WHERE id IN (" + Joiner.on(',').join(ids) + ")");
  }

  public List<Json> getMessagesForUser(long userId) {
    List<Row> rows = db.select("SELECT * FROM message WHERE fromId = ? OR toId = ?", userId, userId);
    return map(rows, Row::toJson);
  }

  public List<Json> getMessagesFrom(long fromId) {
    List<Row> rows = db.select("SELECT * FROM message WHERE fromId = ?", fromId);
    return map(rows, Row::toJson);
  }

  public List<Json> getUnreadMessagesTo(long toId) {
    List<Row> rows = db.select("SELECT * FROM message WHERE toId = ? AND `read` IS false ", toId);
    return map(rows, Row::toJson);
  }

  public void insert(long fromId, long toId, long requestId, String text) {
    db.insert("message", new Row()
        .with("time", LocalDateTime.now())
        .with("fromId", fromId)
        .with("toId", toId)
        .with("requestId", requestId)
        .with("text", text)
        .with("read", false));
  }

}
