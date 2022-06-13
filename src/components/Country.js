import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export const Country = ({getCountryName}) => {
    // states and parameters
    const countryName = useParams();
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState([]);

    // fetch handler for country data
    const fetchHandler = async () => {
        fetch(`https://restcountries.com/v3.1/name/${countryName.countryName}?fullText=true`)
        .then((response) => response.json())
        .then((data) => {
            setCountry(data[0])
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }

    // call the function handler once every render
    useEffect(() => {
       fetchHandler();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="mt-10">
            <Link to="/rest-countries" className="back-btn py-[.5rem] pl-3 pr-5">&#x2190; &nbsp;&nbsp; Back</Link>
            {
                loading ? <div className="font-bold text-2xl">Loading...</div> : 
                 <div className="flex items-center mt-14 country-info gap-16 justify-center flex-wrap">
                    <div>
                        <img src={country.flags.svg} alt="" width="500" height="500" className="h-[400px] object-cover"/>
                    </div>
                    <div>
                        <div>
                            <h2 className="text-3xl mb-4">{country.name["common"]}</h2>
                            <div className="flex gap-8 flex-wrap">
                                <ul>
                                    {country.name.nativeName && <li>Native Names: <span> {
                                         Object.entries(country.name.nativeName).map(item => {
                                            return item[1].official + ", "
                                        })}</span></li>}
                                    <li>Population: <span> {country.population}</span></li>
                                    { country.region && <li>Region: <span> {country.region}</span></li> }
                                    { country.subregion && <li>Sub Region: <span> {country.subregion}</span></li> }
                                    { country.capital && <li>Capital: <span> {country.capital[0]}</span></li> }
                                </ul>
                                <ul>
                                    { country.tld && <li>Top Level Domain: <span> {country.tld[0]}</span></li> }
                                    { country.currencies && 
                                        <li>Currencies: <span> {
                                            Object.entries(country.currencies).map(item => {
                                                return item[1].name + ", "
                                            })
                                        }</span></li>
                                    }
                                    { country.languages &&
                                        <li>Languages: <span>{
                                            Object.entries(country.languages).map(item => {
                                                return item[1] + ", "
                                            })
                                        }</span></li> }
                                </ul>
                            </div>
                        </div>
                        {
                            country.borders &&                         
                            <div className="flex flex-wrap">
                                <h3 className="mr-5">Border Countries: </h3>
                                <div className="flex gap-2 flex-wrap max-w-lg">
                                {
                                    country.borders.map((el, i) => {
                                        let countryName = getCountryName(el);
                                        return (
                                            <Link to={"/rest-countries/" + countryName + "/"} key={i} className="py-1 px-5 inline-block border-country border border-solid border-slate-400">
                                                <span>{countryName}</span>
                                            </Link>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        }
                    </div>
            </div>
         }
        </div>
    );
}