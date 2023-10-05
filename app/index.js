import { useRootNavigationState, Redirect, Link } from "expo-router";
export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  return <Redirect href="/login" />;
}
