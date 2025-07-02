import React, { useState } from 'react';

function ProgressBar() {
    const [progress, setProgress] = useState(0);

    const updateProgress = (delta) => {
        setProgress(prev => Math.max(0, Math.min(100, prev + delta)));
    };

    const getBarColor = () => {
        if (progress >= 80) return 'green';
        if (progress >= 40) return 'orange';
        return 'red';
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
        <h3>My Solution</h3>
            <h2>Progress Bar</h2>
            <div
                style={{
                    height: '25px',
                    backgroundColor: '#ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '20px'
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: getBarColor(),
                        transition: 'width 0.3s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}
                    id="testBgColor"
                >
                    {progress}%
                </div>
            </div>

            <div>
                <button onClick={() => updateProgress(-10)} style={{ padding: '6px 12px' }}>-10%</button>
                <button
                    onClick={() => updateProgress(+10)}
                    style={{ padding: '6px 12px', marginLeft: '10px' }}
                >
                    +10%
                </button>
            </div>
        </div>
    );
}

export default ProgressBar;
