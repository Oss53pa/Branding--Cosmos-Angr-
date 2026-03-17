import React from 'react';

const StimuliAmbiance: React.FC = () => {
  return (
    <section id="stimuli-ambiance">
      <iframe
        src="/stimuli-ambiance.html"
        title="Stimuli d'ambiance"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
      />
    </section>
  );
};

export default StimuliAmbiance;
