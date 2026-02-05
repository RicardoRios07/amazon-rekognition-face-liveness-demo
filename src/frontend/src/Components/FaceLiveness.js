import React from "react";
import { useEffect } from "react";
import { Loader, Heading, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './FaceLiveness.css';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';


function FaceLiveness({faceLivenessAnalysis}) {
    const [loading, setLoading] = React.useState(true);
    const [sessionId, setSessionId] = React.useState(null)
   

    const endpoint = process.env.REACT_APP_ENV_API_URL ? process.env.REACT_APP_ENV_API_URL : ''

    useEffect(() => {
        /*
         * API call to create the Face Liveness Session
         */
        const fetchCreateLiveness = async () => {
            const response = await fetch(endpoint + 'createfacelivenesssession');
            const data = await response.json();
            setSessionId(data.sessionId)
            setLoading(false);

        };
        fetchCreateLiveness();

    },[])

    /*
   * Get the Face Liveness Session Result
   */
    const handleAnalysisComplete = async () => {
        /*
         * API call to get the Face Liveness Session result
         */
        const response = await fetch(endpoint + 'getfacelivenesssessionresults',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionid: sessionId })
            }

        );
        const data = await response.json();
        faceLivenessAnalysis(data.body)
    };

    return (
        <div className="liveness-wrapper">
            {loading ? (
                <div className="loading-container">
                    <Heading level={3} className="loading-title">
                        🔍 Preparando Verificación
                    </Heading>
                    <Text className="loading-text">
                        Iniciando sesión de prueba de vida...
                    </Text>
                    <Loader size="large" />
                </div>
            ) : (
                <>
                    <div className="instruction-container">
                        <Heading level={3} className="instruction-title">
                            📋 Instrucciones para la Verificación
                        </Heading>
                        <ul className="instruction-list">
                            <li>✓ Colócate en un lugar bien iluminado</li>
                            <li>✓ Centra tu rostro en el óvalo</li>
                            <li>✓ Sigue las instrucciones en pantalla</li>
                            <li>✓ Mantén tu dispositivo estable</li>
                        </ul>
                    </div>
                    <FaceLivenessDetector
                        sessionId={sessionId}
                        region="us-east-1"
                        onAnalysisComplete={handleAnalysisComplete}
                        onError={(error) => {
                            console.error(error);
                        }}
                        displayText={{
                            hintCenterFaceText: "Centra tu rostro",
                            hintTooManyFacesText: "Asegúrate de ser la única persona",
                            hintTooCloseText: "Aléjate un poco",
                            hintTooFarText: "Acércate un poco",
                            hintConnectingText: "Conectando...",
                            hintVerifyingText: "Verificando...",
                            hintIlluminationTooBrightText: "Mueve tu rostro a un área menos iluminada",
                            hintIlluminationTooDarkText: "Mueve tu rostro a un área más iluminada",
                            hintIlluminationNormalText: "Iluminación correcta",
                            hintHoldFaceForFreshnessText: "Mantén tu rostro en posición",
                            photosensitivityWarningHeadingText: "Advertencia de fotosensibilidad",
                            photosensitivityWarningBodyText: "Esta prueba muestra luces de colores. Ten precaución si eres sensible a luces intermitentes.",
                            photosensitivityWarningInfoText: "Algunas personas pueden experimentar epilepsia fotosensible por luces intermitentes.",
                            goodFitCaptionText: "Buena posición",
                            tooFarCaptionText: "Muy lejos",
                            startScreenBeginCheckText: "Iniciar verificación",
                            recordingIndicatorText: "Grabando",
                            cameraMinSpecificationsHeadingText: "Requisitos de la cámara:",
                            cameraMinSpecificationsMessageText: "La cámara debe soportar al menos 320x240 píxeles",
                            a11yVideoLabelText: "Video de verificación de identidad",
                            cancelLivenessCheckText: "Cancelar verificación"
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default FaceLiveness;
