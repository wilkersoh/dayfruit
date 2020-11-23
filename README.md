# DayFruit

```bash
npm install

or

yarn install
```

# XSS Attack
- Run js in browser without user inknnowledage

## Build With Modern tech
- Nextjs framework
- mongodb (native driver)
- apollo-server-micro (query server)
- apollo-client version 3 (handle client)
- graphql-tools (makeSchema)
- chakra-ui (styled-component)
- JWT
- date-fns (Date Formatter)
- Authentication With Social Media (next-auth)

# Features (Premium)
- Authentication (Google, Facebook) (SSR)
- Google Map
- SEO
- Facebook, sharing post
- Google analytics
- Cart (CSR)
- Multiple Language (English, Mandarin, Melay)

# Features (Basic)
- Authentication Login (Username && Password) (SSR)
- Forget Password
- Filter (Quick Respond)
- Mailing (Pending)
- Mobile Friendly
- English Version

# API
- CRUD (Done) with mongoose

## index.js
- Listing Product Category

## about
- Client Details, Contact, Email, Google Map

## [category] index.js
- Show category items

# Design Mobile First
# Components
- Header
- Footer
- SideBar (Nav)
- Sign In (Auth) >  Show Component Auth (Google, Facebook, Custom)
- Find Deals > To Listing Page
- Add Buton To Cart
- Cart List

# Route
- Home
- Category (Main Page)
- Products (Selected Category) (8 Items with button to add load more)
- Product/[SingleProduct] (With Add To Cart Button)

# CMS Route
- CMS/index
- CMS/Products

# Database Structure Information
- Admin (username!, password!, mobile!, address!, avatar!, description)
- User (username!, password!, mobile, address, email)
- Product (name!, category!, price!, quantity!, image!, from!, view, description )
- Point ()

# UI Look (Mobile)
- Header [Content] Footer
- (Home) (Header) Logo/Text, Sign In / Find Deals (Go To Product List)
- (Home) [SG] - Shop Details - Map - Go To Shop[Button]
- (Find Deals Header) -> Logo/Text, Cart / Menu
- (Find Deals Menu) -> Sign In, Map, Filter (CheckBox), FeedbackToDeveloper
- (Find Deals Before Content) -> Category List (Fruit), x-axis scrollable
- (Find Deals Content) -> Hots Product / Promotion ~ Card(Image, Label, Product Name, From Where)

# Flow UI
- (Home) - (Go To Shop) - Auth - Login ?: Sign Up [SG_Without_Any_data]
- (Home) - (Find Deals) - Go to Product List (SSR)
- View Product List > Product Items > Add To Cart (CSR) > Cart Icon Show Number
- Click Cart > CheckOut > !login ? Auth : Stripe

# Image Store (S3)

# TodoList
1. Custom Auth [Username/Password] (HOC)
2. Mongodb
3. Graphql
4. Client Side Cache
5. UI/UX
Last. Auth0


## Face Error Graphql
Terminal 有 print出來 要的data 但是 在 front end data有return回來 但是value 是 null
- 那是因為 typeDefs 裡 返回的 type 和 output出來的 type 不一樣， 如果它是 array 那樣放 []

lib -  库文件，library的缩写
utils - 工具代码
