import { 
  PiUser, 
  PiForkKnife, 
  PiDiceFive, 
  PiGear, 
  PiGameController, 
  PiChartPie, 
  PiGridNine, 
  PiEnvelope, 
  PiGlobe, 
  PiSparkle, 
  PiRobot 
} from 'react-icons/pi';

type AppIconProps = {
  name: string;
  className?: string;
};

export function AppIcon({ name, className }: AppIconProps) {
  const iconProps = { className, 'aria-hidden': true };

  switch (name) {
    case 'about-me':
    case 'user':
    case '👤':
      return <PiUser {...iconProps} />;
    case 'bistro-chains':
    case 'utensils':
    case '🍽️':
      return <PiForkKnife {...iconProps} />;
    case 'raggame':
    case 'dice-five':
    case '🎲':
      return <PiDiceFive {...iconProps} />;
    case 'kai-framework':
    case 'gear':
    case '⚙️':
      return <PiGear {...iconProps} />;
    case 'league-of-coders':
    case 'game-controller':
    case '🎮':
      return <PiGameController {...iconProps} />;
    case 'finflow-dashboard':
    case 'chart-pie':
    case '💰':
      return <PiChartPie {...iconProps} />;
    case 'super-tic-tac-toe':
    case 'grid-nine':
    case '⭕':
      return <PiGridNine {...iconProps} />;
    case 'contact':
    case 'envelope':
    case '✉️':
      return <PiEnvelope {...iconProps} />;
    case 'google':
    case 'globe':
    case '🌐':
      return <PiGlobe {...iconProps} />;
    case 'gemini':
    case 'sparkle':
    case '✨':
      return <PiSparkle {...iconProps} />;
    case 'chatgpt':
    case 'robot':
    case '🤖':
      return <PiRobot {...iconProps} />;
    default:
      return <span className={className}>{name}</span>;
  }
}
