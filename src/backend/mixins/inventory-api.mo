import List "mo:core/List";
import Time "mo:core/Time";
import InventoryLib "../lib/inventory";
import Types "../types/inventory";
import Common "../types/common";

mixin (
  inventoryItems : List.List<Types.InventoryItem>,
  inventoryHistory : List.List<Types.InventoryHistory>,
  state : { var nextInventoryItemId : Nat }
) {
  public shared ({ caller }) func addInventoryItem(
    name : Text,
    category : Types.InventoryCategory,
    quantity : Float,
    unit : Text,
    reorderLevel : Float,
    supplierContact : ?Text
  ) : async Types.InventoryItem {
    let id = state.nextInventoryItemId;
    state.nextInventoryItemId += 1;
    InventoryLib.addItem(inventoryItems, id, caller, name, category, quantity, unit, reorderLevel, supplierContact);
  };

  public shared query ({ caller }) func listInventoryItems() : async [Types.InventoryItem] {
    InventoryLib.listItems(inventoryItems, caller);
  };

  public shared query ({ caller }) func getLowStockItems() : async [Types.InventoryItem] {
    InventoryLib.getLowStockItems(inventoryItems, caller);
  };

  public shared ({ caller }) func updateInventoryItem(
    id : Types.InventoryItemId,
    quantity : Float,
    changeType : Types.InventoryChangeType,
    note : Text
  ) : async Bool {
    InventoryLib.updateItem(inventoryItems, inventoryHistory, id, caller, quantity, changeType, note);
  };

  public shared ({ caller }) func removeInventoryItem(id : Types.InventoryItemId) : async Bool {
    InventoryLib.removeItem(inventoryItems, id, caller);
  };

  public shared query ({ caller }) func getInventoryHistory(
    itemId : Types.InventoryItemId
  ) : async [Types.InventoryHistory] {
    InventoryLib.getInventoryHistory(inventoryHistory, itemId);
  };
}
