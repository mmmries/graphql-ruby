var prepareProject = require("../prepareProject")

describe("merging a project", () => {
  it("builds out separate operations", () => {
    var filenames = [
      "./__tests__/project/op_2.graphql",
      "./__tests__/project/op_1.graphql",
      "./__tests__/project/frag_1.graphql",
      "./__tests__/project/frag_2.graphql",
      "./__tests__/project/frag_3.graphql",
    ]
    var ops = prepareProject(filenames, false)
    expect(ops).toMatchSnapshot()
  })

  describe("with --add-typename", () => {
    it("builds out operation with __typename fields", () => {
      var filenames = [
        "./__tests__/project/op_3.graphql",
        "./__tests__/project/frag_2.graphql",
        "./__tests__/project/frag_3.graphql",
        "./__tests__/project/frag_4.graphql",
      ]
      var ops = prepareProject(filenames, true)
      expect(ops).toMatchSnapshot()
    })
  })

  it("blows up on duplicate names", () => {
    var filenames = [
      "./__tests__/documents/doc1.graphql",
      "./__tests__/project/op_2.graphql",
      "./__tests__/project/op_1.graphql",
      "./__tests__/project/frag_1.graphql",
    ]
    expect(() => {
      prepareProject(filenames)
    }).toThrow("Found duplicate definition name: GetStuff, fragment & operation names must be unique to sync")
  })
})
