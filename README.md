# DayFruit

```bash
npm install

or

yarn install
```

# Avoid XSS Attack / CSRF Attack
- JWT Token store in httpOnly

# Benefit of httpOnly cookie
- this kind of cookie cannot generate from client side, it only generate in server
- Client can read it, but cannot modify it.
- only work in same origin

## Build With Modern tech
- Nextjs framework
- mongodb (native driver)
- apollo-server-micro (query server)
- apollo-client version 3 (handle client)
- apollo-server-errors (handle errors, and pass it to front end)
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

# Form Error
- Using React Form Hook To Handle, Not Using Apollo.

# Flow Refresh JWT Token
1. Refresh Page
2. Trigger useEffect and Called RefreshTokenApi (getStaticProps handle it, it will call in server time)
3.  Step > Browser Refresh > NextJs Server > GraphQL Server > NextJs Server (return accessToken to Browser) > Browser

```javascript
const { AppTree, req, res } = ctx;

let serverAccessToken = "";
if (isServer()) {
  const cookie = cookie.parse(req.headers.cookie)
  if(cookie.cookieName) {
    const response = await fetch('refreshTokenApi', {
      method: 'POST',
      credentials: "include",
      headers: {
        cookie: "cookieName=" + cookie.id
      }
    });
    const data = await data.json();
    serverAccessToken = data.accessToken;
  }
}
const apolloClient = (ctx.apolloClient = initApolloClient({}. serverAccessToken));
```


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
- CMS/Auth
- CMS/index (Productions)

# Database Structure Information
- Admin (username!, password!, mobile!, address!, avatar!, description)
- User (username!, password!, mobile, address, email, isAdmin)
- Product (name!, category!, price!, quantity!, image!, from!, view, description )
- Point ()

# Create Account (unique value)
- Username, email

# UI Look (Mobile)
- Header [Content] Footer
- (Home) (Header) Logo/Text, Sign In / Find Deals (Go To Product List)
- (Home) Shop Details - Category -  Go To Shop[Button] - Map (SSG)
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
2. Setup Mongodb
3. Setup Graphql (Done)
4. Client Side Cache
5. UI/UX
Last. Auth0


## Face Error Graphql
1. Terminal 有 print出來 要的data 但是 在 front end data有return回來 但是value 是 null
- 那是因為 typeDefs 裡 返回的 type 和 output出來的 type 不一樣， 如果它是 array 那樣放 []
2. Error: GraphQL error: Assignment to constant variable
- const variable, after i change the value of const.
3. GraphQL error: Cannot return null for non-nullable field User.token.
-  它的database裡面 沒有 token 這個key 但是又在 client side 要求 要 return token
4. Cannot query field \"token\" on type \"User\"."
-  mutation return data name "token" but, it already chanage to accessToken

lib -  库文件，library的缩写
utils - 工具代码
