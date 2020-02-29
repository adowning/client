import gkeepapi

keep = gkeepapi.Keep()
success = keep.login("andrewsgroup2017", "Sugarlips42!")

note = keep.createNote('Todo', 'Eat breakfastx')
note.pinned = True
note.color = gkeepapi.node.ColorValue.Red
keep.sync()