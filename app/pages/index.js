import Page from '../components/Page';
import Image from 'next/image';
import Soccer from '../static/images/soccer.png';

const Index = () => {
  return (
    <div className="app-root">
      <Page classes={'pilkarzyki__main-page'}>
        <p className="pilkarzyki__main-page-title">{`Turniej piłkarzyków Black Ass ${new Date().getFullYear()}`}</p>
        <Image height={500} placeholder="blur" src={Soccer} width={500} />
      </Page>
    </div>
  );
};

export default Index;
