import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/inventory";
import Common "../types/common";

module {
  public func addItem(
    items : List.List<Types.InventoryItem>,
    nextId : Nat,
    caller : Common.UserId,
    name : Text,
    category : Types.InventoryCategory,
    quantity : Float,
    unit : Text,
    reorderLevel : Float,
    supplierContact : ?Text
  ) : Types.InventoryItem {
    let item : Types.InventoryItem = {
      id = nextId;
      ownerId = caller;
      name;
      category;
      quantity;
      unit;
      reorderLevel;
      supplierContact;
      lastRestockedAt = ?Time.now();
      createdAt = Time.now();
    };
    items.add(item);
    item;
  };

  public func listItems(
    items : List.List<Types.InventoryItem>,
    ownerId : Common.UserId
  ) : [Types.InventoryItem] {
    items.filter(func(i) { i.ownerId == ownerId }).toArray();
  };

  public func getLowStockItems(
    items : List.List<Types.InventoryItem>,
    ownerId : Common.UserId
  ) : [Types.InventoryItem] {
    items.filter(func(i) { i.ownerId == ownerId and i.quantity <= i.reorderLevel }).toArray();
  };

  public func updateItem(
    items : List.List<Types.InventoryItem>,
    history : List.List<Types.InventoryHistory>,
    id : Types.InventoryItemId,
    caller : Common.UserId,
    quantity : Float,
    changeType : Types.InventoryChangeType,
    note : Text
  ) : Bool {
    switch (items.find(func(i) { i.id == id })) {
      case null false;
      case (?item) {
        if (item.ownerId != caller) return false;
        let newQty = switch (changeType) {
          case (#restock) item.quantity + quantity;
          case (#usage) { if (item.quantity < quantity) return false; item.quantity - quantity };
          case (#adjustment) quantity;
        };
        let restockedAt = if (changeType == #restock) ?Time.now() else item.lastRestockedAt;
        items.mapInPlace(func(i) {
          if (i.id == id) { { i with quantity = newQty; lastRestockedAt = restockedAt } }
          else i
        });
        let entry : Types.InventoryHistory = {
          itemId = id;
          changeType;
          delta = quantity;
          note;
          timestamp = Time.now();
        };
        history.add(entry);
        true;
      };
    };
  };

  public func removeItem(
    items : List.List<Types.InventoryItem>,
    id : Types.InventoryItemId,
    caller : Common.UserId
  ) : Bool {
    switch (items.find(func(i) { i.id == id })) {
      case null false;
      case (?item) {
        if (item.ownerId != caller) return false;
        let filtered = items.filter(func(i) { i.id != id });
        items.clear();
        items.append(filtered);
        true;
      };
    };
  };

  public func getInventoryHistory(
    history : List.List<Types.InventoryHistory>,
    itemId : Types.InventoryItemId
  ) : [Types.InventoryHistory] {
    history.filter(func(h) { h.itemId == itemId }).toArray();
  };
}
