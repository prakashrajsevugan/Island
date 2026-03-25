import { useState } from "react";
import FrontModel from "./FrontModel/FrontModel";

const Front = () =>{
    const activePreset = { ambient: "#ffd86b", spot: "#ffcc00" };
    const [showTreeInfo, setShowTreeInfo] = useState(false);
    const [showImageCard, setShowImageCard] = useState(false);

    return(
       <section style={{width: '100%', height: '100vh', position: 'relative'}}>
                <FrontModel
                    ambientColor={activePreset.ambient}
                    spotColor={activePreset.spot}
                    onTreeProximityChange={setShowTreeInfo}
                    onDisplayClick={() => setShowImageCard(true)}
                />
                {showImageCard && (
                    <div
                        onClick={() => setShowImageCard(false)}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                                maxWidth: '80vw',
                                maxHeight: '80vh',
                            }}
                        >
                            <button
                                onClick={() => setShowImageCard(false)}
                                style={{
                                    position: 'absolute',
                                    top: '0.6rem',
                                    right: '0.6rem',
                                    background: '#111111cc',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '2rem',
                                    height: '2rem',
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    lineHeight: 1,
                                }}
                            >
                                ✕
                            </button>
                            <img
                                src="/images/alt2.png"
                                alt="Display"
                                style={{ display: 'block', maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                )}
                {showTreeInfo && (
                    <div
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            bottom: '1rem',
                            zIndex: 20,
                            maxWidth: '280px',
                            background: '#111111dd',
                            color: '#fff',
                            border: '1px solid #ffffff44',
                            borderRadius: '12px',
                            padding: '0.75rem 0.9rem',
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                        }}
                    >
                        <strong>Cutted Tree</strong>
                        <p style={{ margin: '0.35rem 0 0' }}>
                            This old trunk is a reminder that the island keeps changing with time.
                        </p>
                        <a
                            href="https://prakashraj-dev.netlify.app/"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: 'inline-block',
                                marginTop: '0.6rem',
                                color: '#111',
                                background: '#ffd700',
                                borderRadius: '999px',
                                padding: '0.35rem 0.75rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            Visit my portfolio
                        </a>
                    </div>
                )}
       </section>
    )
}

export default Front;