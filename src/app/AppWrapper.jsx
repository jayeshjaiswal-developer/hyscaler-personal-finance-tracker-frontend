const { useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { addUserToken } = require("./redux/reducers/userSlice");
const { default: Header } = require("@/common/Header");
const { default: LoginBasedLayout } = require("./LoginBasedLayout");
const { default: Footer } = require("@/common/Footer");

export function AppWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    if (token) dispatch(addUserToken(token));
  }, []);

  return (
    <>
      <Header />
      <LoginBasedLayout>{children}</LoginBasedLayout>
      <Footer />
    </>
  );
}