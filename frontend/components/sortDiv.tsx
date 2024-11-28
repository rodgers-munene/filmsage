import React, { useState } from 'react';
import { Box, MenuItem, TextField } from "@mui/material";


const SortDiv = () => {
  const [selectedYear, setSelectedYear] = useState("") //state to store the selected year by use

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

  return (
    <div className='sortDiv ml-[70px] h-20'>
      <div className='w-1/3 flex justify-between items-center'>
        <div className='flex w-2/3 justify-around items-center'>
        <p>Sort By: </p>
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
              <MenuItem value={year}
              
              >{year}</MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
    </div>
  )
}

export default SortDiv