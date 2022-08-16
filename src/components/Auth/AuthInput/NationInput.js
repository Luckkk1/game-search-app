import { useState, useEffect, useCallback } from 'react';

import { NationList } from '../NationList';
import classes from './NationInput.module.css';

const NationInput = props => {
  const [currentNation, setCurrentNation] = useState('');
  const [nationError, setNationError] = useState(null);

  // 사용자의 현재 접속 국가 확인 API
  const reqeustCurrentNation = useCallback(async () => {
    try {
      const res = await fetch(
        'https://extreme-ip-lookup.com/json/?key=M3oG9awkhwAvOcDHlu1n'
      );
      const data = await res.json();
      if (data.country === '') {
        throw new Error();
      }
      setCurrentNation(data.country);
    } catch (err) {
      setNationError('수동으로 선택해 주세요.');
    }
  }, []);

  useEffect(() => {
    reqeustCurrentNation();
  }, [reqeustCurrentNation]);

  // 국가리스트
  const nationObtion = NationList.sort().map(e => {
    if (e === 'South Korea') {
      return (
        <option selected key={e}>
          {e}
        </option>
      );
    }
    return (
      <option defaultValue={'South Korea'} key={e}>
        {e}
      </option>
    );
  });

  return (
    <div className={classes.formControl}>
      <label htmlFor="nation" className={classes.focus}>
        국가 <span className={classes.fill}>*</span>
      </label>
      {!nationError ? (
        <input
          type="text"
          id="nation"
          value={nationError ? nationError : currentNation}
          disabled
        />
      ) : (
        <select name="nation" className={classes.nationSelect}>
          {nationObtion}
        </select>
      )}
    </div>
  );
};

export default NationInput;
