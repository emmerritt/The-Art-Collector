import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {

    const runSearch = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
            setSearchResults(results);
        } catch (error) {
            console.log('Error in querying this search term', error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <span className="content">
         <a href="#" onClick={runSearch}>{searchValue}</a>
        </span>
    )
  
}

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {

    const Facts = () => {

        const {primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline} = featuredResult;

        const facts = {primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline}

        if (facts.medium) {
            facts.medium = facts.medium.toLowerCase();
        }

        console.log(facts)

        return (
            <section className="facts">
                {facts.description ? <><span className="title">Description</span>
                <span className="content">{facts.description}</span></> : ''}
                {facts.culture ? <><span className="title">Culture</span>
                <Searchable searchTerm={'culture'} searchValue={facts.culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults} /></> : '' }
                {facts.style ? <><span className="title">Style</span>
                <span className="content">{facts.style}</span></> : ''}
                {facts.technique ? <><span className="title">Technique</span>
                <Searchable searchTerm={'technique'} searchValue={facts.technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults} /></> : ''}
                {facts.medium ? <><span className="title">Medium</span>
                <Searchable searchTerm={'medium'} searchValue={facts.medium} setIsLoading={setIsLoading} setSearchResults={setSearchResults} /></> : ''}
                {facts.dimensions ? <><span className="title">Dimensions</span>
                <span className="content">{facts.dimensions}</span></> : ''}
                {facts.people ? <><span className="title">People</span> {facts.people.map(person => <Searchable key={person.personid} searchTerm={'person'} searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />)}</> : ''}
                {facts.department ? <><span className="title">Department</span>
                <span className="content">{facts.department}</span></> : ''}
                {facts.division ? <><span className="title">Division</span>
                <span className="content">{facts.division}</span></> : ''}
                {facts.contact ? <><span className="title">Contact</span>
                <span className="content">{facts.contact}</span></> : ''}
                {facts.creditLine ? <><span className="title">Credits</span>
                <span className="content">{facts.creditLine}</span></> : ''}
            </section>
        )
    }

    const Photos = () => {
        if (featuredResult.images) {
            const {images} = featuredResult;
        const photos = images.map((image) => {
            return <img src={image.baseimageurl} alt={image.description} key={image.imageid} />
        });
        return photos;
        }
    }

    return (
        <> {
            featuredResult ? 
            <main id="feature">
              <div className="object-feature">
                <header>
                  <h3>{featuredResult.title}</h3>
                  <h4>{featuredResult.dated}</h4>
                </header>
                <Facts />
                <section className="photos">
                    <Photos/>
                </section>
              </div>
            </main> :
            <main id="feature"></main>
        }
        </>
    )
}

export default Feature;