import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { SearchFilter } from "./components/SearchFilter";
import { CountryContainer } from "./components/CountryContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Country } from "./components/Country";
import axios from "axios";
import useLocalStorage from "use-local-storage";

function App() {
	// States
	const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultDark ? "dark" : "light"
	);
	const [region, setRegion] = useState("Filter by Region");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [countriesData, setCountriesData] = useState([]);
	const [url, setUrl] = useState("https://restcountries.com/v3.1/all");

	// switchTheme
	const switchTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		document.documentElement.classList.remove(theme);
		document.documentElement.classList.add(newTheme);
		setTheme(newTheme);
	};

	// fetch handler for countries data
	const fetchHandler = async (url) => {
		try {
			let res = await axios.get(url);
			if (res.status === 404) {
				setError("Countries not found");
				setLoading(false);
			} else {
				setCountriesData(res.data);
				setLoading(false);
				setError(false);
			}
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	// call the function handler once every render
	useEffect(() => {
		fetchHandler(url);
		document.documentElement.classList.add(theme);
		// eslint-disable-next-line
	}, []);

	// call the function handler when the url is changed
	useEffect(() => {
		fetchHandler(url);
		// eslint-disable-next-line
	}, [url]);

	// Submit Handler
	const submitHandler = (e) => {
		if (e.length > 3) {
			setUrl(`https://restcountries.com/v3.1/name/${e}`);
		}
		if (e.length === 0) {
			setUrl("https://restcountries.com/v3.1/all");
		}
		setRegion("Filter by region");
	};

	// set Region Handler
	const regionHandler = (r) => {
		setRegion(r);
		if (r && r !== "All") {
			setUrl(`https://restcountries.com/v3.1/region/${r}`);
		} else {
			setRegion("Filter by region");
			setUrl("https://restcountries.com/v3.1/all");
		}
	};

	// Get Country Name
	const getCountryName = (code) => {
		return countriesData
			.filter((element) => {
				return element.cca3 === code;
			})
			.map((el, i) => el.name.common);
	};

	// HomePage Component
	const HomePage = () => {
		return (
			<>
				<SearchFilter
					region={region}
					setRegion={regionHandler}
					submitHandler={submitHandler}
				/>
				{error ? (
					<div className='font-bold text-2xl'>{error}</div>
				) : loading && !countriesData.error ? (
					<div className='font-bold text-2xl'>Loading...</div>
				) : (
					<CountryContainer data={countriesData} />
				)}
			</>
		);
	};

	return (
		<Router>
			<div className='App' data-theme={theme}>
				<Header switchTheme={switchTheme} />
				<main>
					<Routes>
						<Route exact path='/' element={<HomePage />}></Route>
						<Route
							exact
							path='/:countryName'
							element={<Country getCountryName={getCountryName} />}
						></Route>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
