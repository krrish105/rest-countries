export const SearchFilter = ({region, setRegion, submitHandler}) => {
    return (
        <div className="search-filter mt-8 mb-12 flex flex-col sm:flex-row gap-4">

            {/* Country Search */}
            <form className="flex items-center py-4 px-6 w-full sm:w-fit" onSubmit={(e) => { e.preventDefault(); submitHandler(e.target[0].value) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    className="border-0 pl-5 text-base outline-none" 
                    placeholder="Search for a country..."
                    autoComplete="true"/>
            </form>

            {/* Region Selector */}
            <fieldset className="region-selector flex flex-col w-[250px] relative">
                <div className="py-3 px-4 relative flex legend cursor-pointer" onClick={() => document.querySelector('.dropdown').classList.toggle('active-drop')}>
                    <span id="filter-text">{region}</span>
                    <div className="mt-1 absolute right-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                </div>
                <div className="dropdown absolute w-full block">
                    <InputFields name="All" setRegion = {setRegion} />
                    <InputFields name="Africa" setRegion = {setRegion} />
                    <InputFields name="America" setRegion = {setRegion} />
                    <InputFields name="Asia" setRegion = {setRegion} />
                    <InputFields name="Europe" setRegion = {setRegion} />
                    <InputFields name="Oceania" setRegion = {setRegion} />
                </div>
            </fieldset>
        </div>
    );
}

const InputFields = ({name, setRegion}) => {
    return(
        <div>
            <input type="radio" name="region" id={name}  value={name} onClick={(e) => setRegion(e.target.value)}/>
            <label htmlFor={name}>{name}</label>
        </div>
    )
}