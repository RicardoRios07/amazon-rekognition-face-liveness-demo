import './App.css';
import React from "react";
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import FaceLiveness from './Components/FaceLiveness';
import ReferenceImage from './Components/ReferenceImage';
import {
  View,
  Flex,
  Heading,
  Text,
} from '@aws-amplify/ui-react';

import awsexports from './aws-exports';

Amplify.configure(awsexports);

function App() {

  const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null)

  const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
    if (faceLivenessAnalysis !== null) {
      setFaceLivenessAnalysis(faceLivenessAnalysis)
    }
  }

  const tryagain = () =>{
    setFaceLivenessAnalysis(null)
  }


  return (
    <ThemeProvider>
      <div className="app-container">
        <div className="header-section">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M12 13v7"/>
            </svg>
          </div>
          <Heading level={1} className="main-title">
            🔐 Verificación de Identidad
          </Heading>
          <Text className="subtitle">
            Sistema de Reconocimiento Facial con Amazon Rekognition
          </Text>
          <div className="divider"></div>
        </div>

        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="2rem"
          className="content-wrapper"
        >
          <View
            as="div"
            className="liveness-container"
          >
            {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
              <ReferenceImage faceLivenessAnalysis={faceLivenessAnalysis} tryagain={tryagain}></ReferenceImage>
            ) :
              (<FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />)}

          </View>
        </Flex>

        <footer className="app-footer">
          <Text className="footer-text">
            Powered by AWS • Amazon Rekognition Face Liveness
          </Text>
        </footer>
      </div>
    </ThemeProvider>


  );
}

export default App;
