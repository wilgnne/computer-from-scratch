import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Flex } from "@chakra-ui/react";

import Emulator from "../pages/Emulator";
import Assembler from "../pages/assembler";
import EmulatorContextProvider from "./emulator";
import Navbar from "../components/Navbar";

const Routes = {
  Emulator,
  Assembler,
};

export type RouteNames = keyof typeof Routes;

interface INavigatorContext {
  navigate: (path: keyof typeof Routes) => void;
}

const NavigatorContext = createContext<INavigatorContext>(null);

export function useNavigator() {
  return useContext(NavigatorContext);
}

function NavigatorProvider() {
  const [page, setPage] = useState<keyof typeof Routes>("Assembler");

  const navigate = useCallback((path: keyof typeof Routes) => {
    setPage(path);
  }, []);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <NavigatorContext.Provider value={value}>
      <EmulatorContextProvider>
        <Navbar />
        {Object.keys(Routes).map((name) => {
          const Page = Routes[name];
          return (
            <Flex
              key={name}
              flex={1}
              display={name === page ? undefined : "none"}
            >
              <Page />
            </Flex>
          );
        })}
      </EmulatorContextProvider>
    </NavigatorContext.Provider>
  );
}

export default NavigatorProvider;
