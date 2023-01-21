import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "./components/Global/Topbar";
import Sidebar from "./components/Global/Sidebar";
import Dashboard from "./views/dashboard";
import Team from "./views/team";
import Contacts from "./views/contacts";
import Bar from "./views/barChart";
import ProfileForm from "./views/profileForm";
import Line from "./views/lineChart";
import Pie from "./views/pieChart";
import FAQ from "./views/faq";
import Geography from "./views/geographyChart";
import Memes from "./views/memes";
import NotFound from "./views/notFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./views/calendar/calendar";
import Loading from "./components/Global/Loading";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} setIsLoading={setIsLoading} />
            <Loading isLoading={isLoading} />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/profileForm"
                element={<ProfileForm setIsLoading={setIsLoading} />}
              />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route
                path="/memes"
                element={<Memes setIsLoading={setIsLoading} />}
              />
            </Routes>
            {/* container used to display toast notifications */}
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
