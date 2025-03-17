export enum ApiEndpoints {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  FORGOT_PASSWORD = "auth/forgot-password",
  VERIFY_PASSWORD_RESET_TOKEN = "auth/verify-password-reset-token",

  USERS = "/users",
  VERIFY_PASSWORD = "/users/verify-password",
  CHANGE_PASSWORD = "/users/change-password",
  ACTIVITIES_SUMMARY = "/users/summary/activities",

  USER_ACTIVITIES = "/activity/user",
  ACTIVITY_PRESETS = "/presets",
  ACTIVITIES = "/activity",
  ACTIVITIY_TYPES = "/activity-types",
  EXERCISES = "/exercises",
  TOGGLE_FAVOURITE_EXERCISE = "/exercises/user",
  FAVOURITE_EXERCISES = "/exercises/user/favourite-exercises",
}
