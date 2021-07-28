describe('testing fetch API', function() {
    it("matches any value", function() {
      expect({}).toEqual(jasmine.any(Object));
      
    });
    it("matches any value", function() {
        expect(fetch("https://5dc588200bbd050014fb8ae1.mockapi.io/assessment")).toEqual(jasmine.any(Object));
      });


    it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
        var foo = function() {
          throw new TypeError("error");
        };
    
        expect(foo).toThrowError("error");
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "error");
      });
    });