import { NowRequest, NowResponse } from '@now/node'
import Axios from 'axios';
import dashify from 'dashify';

interface Hero {
  id: number;
  localized_name: string;
  img: string;
  icon: string;
  roles: string[];
  attack_type: string;
}

export default (request: NowRequest, response: NowResponse) => {
  Axios.get<Record<number, Hero>>('https://api.opendota.com/api/constants/heroes').then(resp => {
    const heroes = (
      Object.values(resp.data)
      .map(hero => ({
        id: dashify(hero.localized_name.replace("'", "")),
        name: hero.localized_name,
        imageUrl: `https://api.opendota.com${hero.img}`,
        iconUrl: `https://api.opendota.com${hero.icon}`,
        roles: hero.roles,
        attackType: hero.attack_type,
        internalId: hero.id,
      }))
      .sort((hero1, hero2) =>
        hero1.name < hero2.name ? -1 : 1,
      )
    );
    response.setHeader('s-maxage', 60*60*24);
    response.status(200).send(heroes);
  })
}
