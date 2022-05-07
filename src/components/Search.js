import React, { useEffect, useState } from 'react';
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = ({ setIsLoading, setSearchResults }) => {

   const [centuryList, setCenturyList] = useState([]);
   const [classificationList, setClassificationList] = useState([]);
   const [queryString, setQueryString] = useState('');
   const [century, setCentury] = useState('any');
   const [classification, setClassification] = useState('any');

  useEffect(() => {
    const getCenturiesAndClassifications = async () => {
      try {
        const allCenturies = await fetchAllCenturies();
        setCenturyList(allCenturies);
        const allClassifications = await fetchAllClassifications();
        setClassificationList(allClassifications)
        console.log(allCenturies)
        console.log(allClassifications)
      } catch (error) {
        console.log(error);
      }
    }
    getCenturiesAndClassifications();
  }, []);

  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const results = await fetchQueryResults({ century, classification, queryString });
      setSearchResults(results)
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={(e) => setQueryString(e.target.value)}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(e) => setClassification(e.target.value)}>
        <option value="any">Any</option>
        {classificationList.map((classif) => {return (<option value={classif.name} key={classif.id}>{classif.name}</option>)})}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(e) => setCentury(e.target.value)}>
        <option value="any">Any</option>
        {centuryList.map((cent) => {return (<option value={cent.name} key={cent.id}>{cent.name}</option>)})}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;