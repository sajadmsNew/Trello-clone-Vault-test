import React, { useState,  } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AppTheme, appStyles } from "./styles";
import { ThemeProvider } from "@material-ui/styles";

const AppLayout = ({ children }) => {
  const [changeBackground, setChangeBackground] = useState(false);
  const classes = appStyles();
  return (
    <>
      <ThemeProvider theme={AppTheme}>
        <div
          style={{
            backgroundColor: changeBackground === true ? "#F8F9FD" : "#FFFFFF",
          }}
          className={classes.root}
        >
          <header>
            <Header />
          </header>
          <div
            style={{
              backgroundColor:
                changeBackground === true ? "#F8F9FD" : "#FFFFFF",
            }}
            className={classes.children}
          >
            {children}
          </div>
          <footer className={classes.footer}>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AppLayout;
