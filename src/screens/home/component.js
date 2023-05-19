import React from 'react';
import { ReactSVG } from 'react-svg';

import ReadingSnippet from './readingSnippet';
import './style.scss';

const Meetings = () => {
  return (
    <>
      <h3>No Meetings Today</h3>
      <p>
        Dont see what you are looking for? We only display events from your
        calendar over the next week and scheduled agendas{' '}
      </p>
      <ReactSVG src='/home-undraw.svg' />
      <section className='home-meetings__bottom'>
        <p className='text-align--center'>Nothing to show here.</p>
      </section>
    </>
  );
};

const Home = () => {
  console.log('here');
  return (
    <div id='home-container'>
      <h1>Welcome John</h1>
      <div className='home__grid segment' id='home-segment'>
        <section className='home_section'>
          <div className='segment home-meetings__segment'>
            <Meetings />
          </div>
        </section>
        <section className='home_section'>
          <div className='reading-snippets'>
            <ReadingSnippet
              title='Get Started with ConnectUS'
              text="Let's look more into all the ways you can use ConnectUS to communicate with your team."
              link={'https://www.connect-us.io '}
            />
            <ReadingSnippet
              title='Enhance corporate culture'
              text='Culture is not dictated by executives, but is built by the employees.'
              link='https://www.connect-us.io '
            />
            <ReadingSnippet
              title='Company administration'
              text='Learn how to manage your ConnectUS account on a team or company level.'
              link='https://www.connect-us.io '
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
