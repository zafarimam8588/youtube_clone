import './App.css';
import { useEffect,useState } from 'react';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/store';
import { createBrowserRouter,Outlet } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from "./components/WatchPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeContext from './utils/ThemeContext';


const queryClient = new QueryClient({})

const App = ()=>{
  // IT WILL RETURN TRUE IF BROWSER DEFAULT MODE IS DARK OTHERWISE FALSE
  const isBrowserDefaultDark = ()=>{
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  const getDefaultTheme = ()=>{
     const localStorageTheme = localStorage.getItem("theme");
     const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
     return localStorageTheme || browserDefault;
  }

  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    if (theme === "dark") {
      // document.documentElement IS USE TO MANIPULATE <HTML> TAG DIRECTLY
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return(
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{theme,setTheme}}>
        <Provider store={store}>
            <div className="font-Roboto">
              <Head />
              <Outlet />
            </div>
        </Provider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  )
}

export default App

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>notfound</div>,
    children: [
      {
        path: "/",
        element: <Body />,
        children: [
          {
            path: "/",
            element: <MainContainer />,
          }
        ],
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);
