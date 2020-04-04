import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';

type Item = unknown;

export default function HeroPage() {
  const { heroId } = useParams();
  const [items, setItems] = useState([] as Item[]);

  useEffect(() => {
    Axios.get<Item[]>(`https://api.opendota.com/api/constants/heroes/${heroId}/itemPopularity`).then(resp => {
      setItems(resp.data);
    })
  }, [heroId]);

  return (
    <div>
      <h1>{heroId}</h1>
      {items.toString()}
    </div>
  );
}