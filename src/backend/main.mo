import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Service Types Enumeration
  type ServiceType = {
    #aiAgent;
    #videoEditing;
    #videoThumbnail;
    #adsProduction;
    #songVideoProduction;
    #preWeddingPhotography;
  };

  // Inquiry Structure
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : ?Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  // User Profile Structure
  public type UserProfile = {
    name : Text;
  };

  // Storage Initialization
  let inquiriesMap = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 1;
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization State Initialization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Public Method to Submit Inquiry (accessible to anyone including guests)
  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    phone : ?Text,
    serviceType : ServiceType,
    message : Text,
  ) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      email;
      phone;
      serviceType;
      message;
      timestamp = Time.now();
    };

    inquiriesMap.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  // Admin-Only Method to Retrieve All Inquiries
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access this data");
    };
    inquiriesMap.values().toArray();
  };

  // User Profile Methods

  // Get caller's own profile (user-only)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get any user's profile (own profile or admin can view any)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save caller's own profile (user-only)
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
