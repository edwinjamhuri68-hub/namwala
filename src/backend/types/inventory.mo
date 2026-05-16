import Common "common";

module {
  public type InventoryItemId = Nat;

  public type InventoryCategory = {
    #seeds;
    #fertilizer;
    #feed;
    #medicine;
    #equipment;
    #other;
  };

  public type InventoryChangeType = { #restock; #usage; #adjustment };

  public type InventoryItem = {
    id : InventoryItemId;
    ownerId : Common.UserId;
    name : Text;
    category : InventoryCategory;
    quantity : Float;
    unit : Text;
    reorderLevel : Float;
    supplierContact : ?Text;
    lastRestockedAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type InventoryHistory = {
    itemId : InventoryItemId;
    changeType : InventoryChangeType;
    delta : Float;
    note : Text;
    timestamp : Common.Timestamp;
  };
}
