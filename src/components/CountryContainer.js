import { Link } from "react-router-dom";

export const CountryContainer = ({ data }) => {
	return (
		<div className='countries-container grid gap-x-[2%] justify-center gap-y-11'>
			{data.map((el, i) => {
				return (
					<div
						className='country-card w-full hover:scale-105 rounded-sm transition-transform duration-200 ease-in-out'
						key={i}
					>
						{el.flags.svg && (
							<img
								src={el.flags.svg}
								alt=''
								className='w-full object-cover h-[12.3rem] border-b-2 rounded-sm'
							/>
						)}
						<div className='country-card-text py-5 px-6'>
							<Link to={"/" + el.name["common"]}>
								<h2 className='mb-5 cursor-pointer text-lg'>
									{el.name["common"]}
								</h2>
							</Link>
							<div>
								<span>Population : </span> {el.population}
							</div>
							{el.region && (
								<div>
									<span>Region : </span> {el.region}
								</div>
							)}
							{el.capital && (
								<div>
									<span>Capital : </span> {el.capital}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
