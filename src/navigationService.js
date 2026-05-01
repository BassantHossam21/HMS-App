let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigateToLogin = (from) => {
  if (navigator) {
    navigator("/login", { state: { from } });
  }
};
