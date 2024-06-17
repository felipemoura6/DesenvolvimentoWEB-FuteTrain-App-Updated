import React from 'react';
import { ContentTraining } from './content-training';
import { ContentProgress } from './content-progress';
import { ContentHistory } from './content-history';
import { ContentInventory } from './content-inventory';
import { ContentNews } from './content-news';
import { ContentPremium } from './content-premium';
import { ContentTeams } from './content-teams';
import { ContentSpecificTeam } from './content-specific-team';

interface ContentProps {
  content: string;
}

export function Content({ content }: ContentProps): JSX.Element {
  switch (content) {
    case 'training':
      return <ContentTraining/>;
    case 'progress':
      return <ContentProgress/>;
    case 'history':
      return <ContentHistory/>;
    case 'inventory':
      return <ContentInventory/>;
    case 'news':
      return <ContentNews/>;
    case 'premium':
      return <ContentPremium/>;
    case 'teams':
      return <ContentTeams/>;
    case 'specific team':
      return <ContentSpecificTeam/>;
    default:
      return <div>Select a page from the Navbar.</div>;
  }
}
