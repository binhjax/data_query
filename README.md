# data_query_tool
# Folder structure
- branding
- cypress-base 
- images 
- node_modules
- spec 
- src 
- stylesheets: styles which used in all components 
## src 
- addSlice: 
  + Using: 
    - dashboard
    - query 
  + 
- api
  + 
- chart 
- common 
- components 
- CRUD
- dashboard 
- dataMask 
- datasource 
- explore 
- filters 
- logger 
- messageToasts
- middleware 
- modules 
- profile 
- setup 
- showSavedQuery
- SqlLab
- staticPages 
- types
- utils 
- views
- visualization



Tables 


## Main structures
 - Theme
 - Preamble 
 - addSlice
 - explore
 - dashboard
 - sqllab
 - crudViews
 - menu
 - profile
 - showSavedQuery


 # Note: 
    + react-dom -> @hot-loader/react-dom
    + @emotion/core 
    + @superset-ui/core
    + @superset-ui/core
    + @superset-ui/chart-controls


# Data Flow

client => Webpack server => Superset 
 
 + Webpack will replace css and js based on comments 

 Example:   
  + addSlice 
   - index => Call app 
   - Process:
       + 1. setupApp(): Add javascript in ready function 
       + 2. setupPlugins(0
       )
       + 3. Get data-bootstrap
       + 4. initFeatureFlags => window.featureFlags 
       + 5. 


## Explorer inject 
