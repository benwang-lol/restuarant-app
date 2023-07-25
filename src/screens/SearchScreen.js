import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchAPI, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        //price === '$$$' || '$$' || '$'
        return results.filter(result => {
            return result.price === price;
        })
    }

    return (
    /* could alternatively do <View style={{flex: 1}}></View> */
    <> 
        <SearchBar 
            term={term} 
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => searchAPI(term)}
        />
        {/*pass a parameter newTerm into the function and call setTerm on it */}
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <ScrollView>
            <ResultsList 
                results={filterResultsByPrice('$')} 
                title="Cost Effective"
            />  
            <ResultsList 
                results={filterResultsByPrice('$$')} 
                title="Bit Pricier"
            />
            <ResultsList 
                results={filterResultsByPrice('$$$')} 
                title="Big Spender"
            />
        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({});

export default SearchScreen;