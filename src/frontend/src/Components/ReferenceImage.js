import React from "react";
import '@aws-amplify/ui-react/styles.css';
import './ReferenceImage.css';

import {
    Alert,
    Image,
    useTheme,
    Button,
    Heading,
    Flex,
    Badge
} from '@aws-amplify/ui-react';

function ReferenceImage({ faceLivenessAnalysis , tryagain }) {
    const { tokens } = useTheme();
    const isLive = faceLivenessAnalysis.Status === "SUCCEEDED";
    const confidence = faceLivenessAnalysis.Confidence.toFixed(2);
    
    return (
        <div className="result-container">
            <div className="result-header">
                <Heading level={2} className="result-title">
                    {isLive ? '✓ Verificación Exitosa' : '⚠ Verificación Fallida'}
                </Heading>
            </div>

            <Flex direction="column" gap="1rem" className="result-details">
                <div className="detail-card">
                    <span className="detail-label">📋 ID de Sesión:</span>
                    <span className="detail-value">{faceLivenessAnalysis.SessionId}</span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">📊 Estado:</span>
                    <Badge 
                        variation={isLive ? "success" : "warning"}
                        size="large"
                        className="status-badge"
                    >
                        {isLive ? 'Aprobado' : 'Rechazado'}
                    </Badge>
                </div>

                <div className="detail-card confidence-card">
                    <span className="detail-label">🎯 Nivel de Confianza:</span>
                    <div className="confidence-display">
                        <span className="confidence-value">{confidence}%</span>
                        <div className="confidence-bar">
                            <div 
                                className="confidence-fill" 
                                style={{width: `${confidence}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </Flex>

            <div className="image-section">
                <Heading level={4} className="image-title">📸 Imagen de Referencia</Heading>
                <div className="image-wrapper">
                    <Image
                        src={"data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes}
                        alt="Imagen de referencia capturada"
                        className="reference-image"
                    />
                </div>
            </div>

            <Button 
                variation="primary" 
                size="large"
                onClick={tryagain}
                className="retry-button"
            >
                🔄 Realizar Nueva Verificación
            </Button>
        </div>
    );
}

export default ReferenceImage;
