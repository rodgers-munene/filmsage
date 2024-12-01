import React, { useState } from 'react';
import { Box, MenuItem, TextField, Slider } from "@mui/material";


const SortDiv = () => {
    const [selectedYear, setSelectedYear] = useState("") //state to store the selected year by use
    const [sliderValue, setSliderValue] = useState("4.0")

    // Handling  sort By year
    const currentYear = new Date().getFullYear() // get current year
    const startYear = 1900;

    // generate an array of all the years dynamically
    const years = Array.from({length: currentYear - startYear + 1}, (_, i) => currentYear - i)

    // handling year change
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSelectedYear(event.target.value as string)
    console.log("Selected Year: ", event.target.value)

    // logic for handling the year sort goes here 👇
    }


    // movie ratings value text
    function valueText(value: any){
      return `${value}`
    }

    //movie rating marks

    const marks = [
      {value: 1, label: '1.0'},
      {value: 2, label: '2.0'},
      {value: 3, label: '3.0'},
      {value: 4, label: '4.0'},
      {value: 5, label: '5.0'},
    ]

    const handleChange = (event: any, newValue: any) =>{
      setSliderValue(parseFloat(newValue).toFixed(1))
    }

  return (
    <div className='sortDiv ml-6 h-20 flex justify-between items-center'>
      {/* latest and year select */}
      <div className='w-1/3 flex justify-between items-center'>
        <div className='flex w-2/3 justify-around items-center'>
          <p>Sort by: </p>
          <button className='bg-[#373737] px-6 py-2 rounded-lg'>Latest</button>
        </div>
        <Box width="130px" height="50px" >
          <TextField
          className="custom-scrollbar"
          label='Year'
          select
          value={selectedYear}
          onChange={handleYearChange}
          fullWidth
          sx={{
            label: {
              color: 'white', // Label color
            },
            "& .MuiSvgIcon-root": {
                color: "white",
            },
            "& .MuiInputBase-input": {
              color: "white", // Selected option text color
            },
            "& .MuiOutlinedInput-root": {
              height: "40px",
              marginTop: "5px",
              backgroundColor: "#373737",
              borderRadius: "10px",
              "& fieldset": {
              border: "none", // Border color
            },
            "&:hover fieldset": {
              borderColor: "lightgray", // Hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Focus border color
            },
          },
          }}
         SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: 300, // Limit dropdown height
              overflowY: "auto", // Enable scrollbar
              backgroundColor: "darkgray", // Dropdown background
              "& .MuiMenuItem-root": {
                color: "black", // Option text color
                "&:hover": {
                  backgroundColor: "gray", // Hover background
                },
              },
              // Custom scrollbar styles
              "&::-webkit-scrollbar": {
                width: "5px", // Scrollbar width
              },
              "&::-webkit-scrollbar-track": {
                background: "lightgray", // Scrollbar track background
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "black", // Scrollbar thumb color
                borderRadius: "4px", // Rounded scrollbar thumb
              },
            },
          },
        },
      }}
          
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}
              
              >{year}</MenuItem>
            ))}
          </TextField>
        </Box>
      </div>

      {/* rating select range  */}

      <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="size-6 mr-2">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
      </svg>


       <Slider 
       aria-label='Ratings'
       defaultValue={4}
       getAriaValueText={valueText}
       valueLabelDisplay="auto"
       onChange={handleChange}
       step={1}
       marks={false}
       min={1}
       max={5}
       sx={{
        width: 200,
        '& .MuiSlider-track': { color: 'gold', // Color of the covered part
           },
        '& .MuiSlider-rail': { color: 'gray', // Color of the uncovered part
         },
         '& .MuiSlider-thumb': { color: 'white', // Color of the thumb
         },
       }}
       />

       <p className='ml-3'>
        {sliderValue}
       </p>
      </div>

    </div>
  )
}

export default SortDiv