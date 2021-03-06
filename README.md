# DayFruit

```bash
npm install

or

yarn install
```

# Build With Modern tech
- Nextjs framework
- mongodb (native driver)
- apollo-server-micro (query server)
- apollo-client version 3 (handle client)
- apollo-server-errors (handle errors, and pass it to front end)
- graphql-tools (makeSchema)
- chakra-ui (styled-component)
- JWT
- date-fns (Date Formatter)
- react-transition-group ( UI/UX )
- Authentication With Social Media (next-auth)

# Avoid XSS Attack / CSRF Attack
- JWT Token store in httpOnly

# Benefit of httpOnly cookie
- this kind of cookie cannot generate from client side, it only generate in server
- Client can read it, but cannot modify it.
- only work in same origin

# JWT (RefreshToken / AccessToken / Ban List)
1. RefreshToken (Done)
2. AccessToken (Done)
3. Ban List (SignOut / Change Password)
>> secretKey + hashPassword = refreshToken

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
- SignOut
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

# index.js
- Listing Product Category

# about
- Client Details, Contact, Email, Google Map

# home index.js
- Show category items
- props: (component Category)
  - vitamins, fruitsName, imageSrc, fruitId

# Search Features
- Vitamins
- Fruit

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

# CMS Page
- Index (Categories, Vitamins, Products)
- Categories (show list, and add button)
- Vitamins (show list, and add button)
- Products (show list, and add button)
- Product

# Database Structure Information
- Admin (username!, password!, mobile!, address!, avatar!, description)
- User (username!, password!, mobile, address, email, isAdmin)
- Product (name!, image!, from!, view, description )
- Point ()

# Create Account (unique value)
- Username, email

# Create Fruit (unique value)
- name

# Notes
1. .sort({ createdAt: -1 }) desc 最新到舊
2. aria-current=page 来描述navlink中当前显示的页面
3. passing condition in component props
- If isActive is truthy the object literal with bg and rounded properties is spread into the passed props to SideNavLink. isActive itself is not passed as a props

4. apollo mutation update writeQuery

```javascript
const cachedData = cache.readQuery({
  query: GET_FRUTIS_QUERY,
});
cachedData.getFruits = [
  {
    ...result.data.createFruit,
    createdAt: new Date().toISOString(),
    _id: result.data.createFruit.name, // this only temporary and must unique.
  },
  ...cachedData.getFruits,
];

cache.writeQuery({
  query: GET_FRUTIS_QUERY,
  data: { ...cachedData },
});
```

```react
...{bg: "teal.200", rounded: "sm",}

<NavLink href={href}>
  {(isActive) => (
    <SideNavLink
      {...(isActive && {
        bg: "teal.200",
        rounded: "sm",
      })}
      {...props}
    />
  )}
</NavLink>
```

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
2. Error: GraphQL error: Assignment to constant variable, 第二次遇到 他也是在typeDefs是 []但是 放回一样没有data 在 terminal就有， 不只改了什么 感觉没改任何东西 它又work了，useQuery return 出来的 data 是 object Array {[]} 也可以work
- const variable, after i change the value of const.
3. GraphQL error: Cannot return null for non-nullable field User.token.
-  它的database裡面 沒有 token 這個key 但是又在 client side 要求 要 return token
4. Cannot query field \"token\" on type \"User\"."
-  mutation return data name "token" but, it already chanage to accessToken
5. Expected Iterable, but did not find one for field (in playground)
-  the return data from database is not array type
6. Didn't Update UI after mutation writeQuery (cached updated but ui not)
- it must included all data attribute it needed, like _id, createdAt, etg
7. GraphQLError [Object]: Syntax Error: Expected Name, found "(".
- createCategory:(name: String!): Category，多一個冒號
8. POST http://localhost:3000/api/graphql 400 (Bad Request)
- 这个是 说 收到的资料 和 update的不符合 直接娶不到 server，检查 typedefs和它return的对象也要有, and mutation 里面收的variable
9. Cannot return null for non-nullable field Fruit.name. (in playground)
- return回来的 data是 array 所以 出现这个error 要去 typeDef 那边 放【】

# Flow Transition Animation SignInRegister Form
1. SignIn Button Bg, moving right and overflow hidden
2. Register Bg side in after


# CSSTransition

in={Boolean} 告訴它 是 show 還是 hide
timeout={transitionTime}
timeout={{ exit: 1000, appear: 2000 }}
className={'PrefixClassNameUseInCSS'}
unmountOnExit={true}  解釋animation unmount當前Component
appear={true}
onExited={() => callbackAfterAnimationDone()}
mountOnEnter={} // 當 in 變成 true 才顯示，default 是已經 render了
它會有3種classNamePrefix
1. appear (component eventually show up when app is loaded) （initital, nextPage) 可以set在CSSTransition裡
2. enter (component mounted) (on hide then trigger to show )
3. exit  (component unmounted)
```react
<CSSTransition
  in={this.state.titleScreen}
  timeout={1000}
  className={'title-screen-'}
  unmountOnExit={true}
  onExited={() => this.setState({ gameBoard: true })}
>
  <TitleScreen />
</CSSTransition>

{this.state.gameBoard && <GameBoard />}
function TitleScreen(props) {
  return (
    <!-- 上面的 className 會加進來  -->
    <div className="title-screen title-screen--exit title-screen--exit-active title-screen--done"></div>
  )
}
```
# Flow of animation
timeout={1000} || className
1. -enter (第一看見就read 這個css) happend in 0 timeout
2. -enter-active (1。結束馬上近來這個)  happend in 0 timeout
3. -enter-done (第二個 transition 1秒 它結束後就來到這裡)

1. opacity: 0
2. opacity: 1, transition opacity 1s
3. 它會拿掉 1. 2. 的 className 然後 + 3.className

# SwitchTransition Inside has CssTransition
key={"anyUpdate"} listen the activePlayer
timeout={1000}
className={'play__icon'}
```react
<SwitchTransition>
  <CSSTransition
    key={this.state.activePlayer}
    timeout={1000}
    className={'play__icon-'}
  >
  <PlayIcon icon={this.state.activePlayer} />
</SwitchTransition>
```
1. exit
2. enter

# TransitionGroup
component={'div'} by Default it will created a div component. Can set it to null.
**classNames**
```react
<TransitionGroup component={null}>
  <CSSTransition
    key={`user-${index}`}
    timeout{{ enter: 800, exit: 500}}
    classNames={`user-transition`}
  >
    <User index={index} userName={userName} />
  </CSSTransition>
</TransitionGroup>
```

lib -  库文件，library的缩写
utils - 工具代码

# Mongodb

```bash
db.posts.update({title: "Post One"},
  {
    $set: {
      body: "Only updated Post One Body document"
    }
  }
)

db.posts.update({title: "Post One"},
  {
    $set: {
      comments: [
        { user: "Wilker", body: "This will added new field if there is not this comments, "}
      ]
    }
  }
)

db.posts.update({title: "Post One"},
  {
    $inc: {
      views: 1, // this will increament views + 1
    }
  }
)

db.posts.update({title: "Post One"},
  {
    $rename: {
      views: "likes", // this will rename views to likes
    }
  }
)

Find all posts inside comments name is Mary Williams
Raw data
{
  _id: ObjectId(‘5d1231231’)
  title:  “Post One”,
comments: [
    {user: “Mary Williams”},
    {user: “Wilker”}
  ]
}

db.posts.find({
  commnets: {
    $elemMatch: {
      user: ‘Mary Williams’
    }
  }
})

db.posts.remove({title: "Post One"})

db.posts.aggregate([
  { $match: { "title": "Post One" } }
]) // return array of posts that are title "Post One"

```

# Call graphql in nextjs feature

```javascript
import fetch from "isomorphic-unfetch";

export const getServerSideProps = async ({ params }) => {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          getFruits {
            _id
            name
            category
            createdAt
          }
        }
      `,
    }),
  });
  const result = await res.json();
  console.log(result.data.getFruits);

  return {
    props: {}, // will be passed to the page component as props
  };
};

```

graphql aliases

```graphql
query ProductTitle($id: ID!) {
  product(id: $id) {
    IamAliasesName: title
    description
  }
}
## output
{
  "data": {
    "product": {
      "IamAliasesName": "Still output title value but name key is changed"
      "description": "this called aliases"
    }
  }
}

## KEY of Aliases Use Case (query same flied in one request)
# this is in playground
query {
  product1: product(id: "123") {
    title
    description
  }
  product2: product(id: "45") {
    title
    description
  }
}
```

Graphql Fragment

```graphql
# Product come from the return type
fragment TitleAndDescription on Product {
  title
  description
}

query {
  product1: product(id: "123") {
    ...TitleAndDescription
  }
  product2: product(id: "45") {
    ...TitleAndDescription
  }
}
```

Graphql Inline fragment (Just show case, how the inline fragment look like.)

```graphql
mutation tagsAdd($id: ID!, $tags: [String]!) {
  tagsAdd(id: $id, tags: $tags) {
    node {
      id
      ... on Product {
        title
        description
      }
    }
  }
}
```

args is an object code is more clean
[article](https://www.apollographql.com/blog/designing-graphql-mutations-e09de826ed97/?fbclid=IwAR2Im4BmL_KnnzJlxCaB7PmhA4N7muDghQyMi9pFGAXQItziMemav7GfUT4)

```gaphql
updatePost(input: { id: 4, newText: "..." }) { ... }

# Instead of:

updatePost(id: 4, newText: "...") { ... }

mutation MyMutation($input: UpdatePostInput!) {
  updatePost(input: $input) { ... }
}

# vs.

mutation MyMutation($id: ID!, $newText: String, ...) {
  updatePost(id: $id, newText: $newText, ...) { ... }
}

```

# Pm2 for nextjs
[link](https://github.com/vercel/next.js/discussions/10675)


# IMPROVEMENT
> /pages/cms/products
- 可以一次 request 拿 全部 需要的data (包括 create fruit 裡的 category, 过后用 readQuery拿)
> /apollo/client
- make auth more better
- /components/NavLink ComponentLink/SideNavLink ref （看需不需要）
- cms/category name 可以考虑 transform 去 uppercase 避免user duplicated当是一样的内容
- All TYPE, value set to UPPPERCASE (vitamins, category)
> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
- login hit inside LoginForm signupWithCustom - auth - setUser cause error

# Mind PlayGround
- How to get category and able select one of them in form fruit
1. create category and store in database category collection
2. retrieve data category from collection in fruit create form
3. Craete Fruit form able to choose one of them and store the value of the category name instead of id (dont need to relation, if wanna to filter, we can use aggregate $match to achieve it)
5. For better performance, we can store latest category in cached, we read it from cached data in fruit form. Less time to call api to get data.
**All Collection stand alone, we just simply read data**
- Filters (viamins and fruit type)
1. fruit 的 selection比较优先 但 user select furit 的 filter， vitamin 会根据 被select fruit的 vitamin打勾 然后 会显示 selected fruit type 的水果 在 list
2. 当user select fruit 上面的 vitamins 会 显示 furit当前的 vitamin 但是 它会 disabled 除非 user 点击 reset fruit type
- graphql pagination
1. return count to front end (to next data loaded)
2. sorting part 放在 front end or backend 都行 它应该不能通过index来做


# Practice Skills

<!-- map a filter if get a gorup a data of vitamins [Vitamin_C] value, check below list which is matched it -->

```json
{
  a: {
    "name": "apple",
    "vitamins": ["Vitamin_A", "Vitamin_B"]
  },
  b: {
    "name": "banana",
    "vitamins": ["Vitamin_A", "Vitamin_C"]
  }
}
```

TODO List
- 把dayfruit的 cms auth 做完
- 設計cms 的 index
- cms的category table
- 學習

