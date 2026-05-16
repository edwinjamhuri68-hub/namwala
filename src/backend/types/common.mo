module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type ListingId = Nat;
  public type MessageId = Nat;
  public type ConversationId = Nat;
  public type NotificationId = Nat;
  public type OrderId = Nat;
  public type PaymentId = Nat;
  public type DiagnosisId = Nat;

  public type UserRole = {
    #farmer;
    #livestock_keeper;
    #agri_specialist;
    #veterinarian;
    #input_seller;
    #input_service_provider;
    #weather_soil_specialist;
    #market_advisor;
    #transport_provider;
    #buyer;
  };

  public type Location = {
    region : Text;
    district : Text;
    village : Text;
    coordinates : ?{ lat : Float; lng : Float };
  };

  public type Language = { #english; #swahili };

  public type NotificationPriority = { #critical; #high; #normal };

  public type NotificationType = {
    #disease_alert;
    #weather_alert;
    #price_update;
    #message;
    #service_request;
    #pest_outbreak;
    #vaccination_reminder;
    #order_update;
    #low_stock_alert;
    #group_invite;
    #loan_status_update;
    #contract_pending;
    #govt_announcement;
    #badge_earned;
  };

  public type PaymentMethod = { #mpesa; #tigo_pesa; #airtel_money; #crdb; #nmb; #cash };
  public type PaymentStatus = { #pending; #held; #completed; #failed; #refunded };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #in_transit;
    #delivered;
    #cancelled;
  };

  public type ListingType = {
    #crop;
    #animal;
    #input;
    #service;
    #transport;
  };
}
