import React from 'react';
import type { ScenarioKey } from './Scenarios';
import ScenarioMasterBook from './ScenarioMasterBook';

interface Props {
  scenarioKey: ScenarioKey;
  onBack: () => void;
}

const ScenarioMasterBookB: React.FC<Props> = (props) => (
  <ScenarioMasterBook {...props} />
);

export default ScenarioMasterBookB;
